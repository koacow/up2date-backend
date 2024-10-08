// articlesRouter matches /api/articles paths

// Import required modules
const { query, param, validationResult } = require('express-validator');
const articlesRouter = require('express').Router();
const supabase = require('../../models/db');
const { NEWS_API_KEY } = process.env;
const NEWS_API_EVERYTHING_ENDPOINT = 'https://newsapi.org/v2/everything';
const NEWS_API_TOP_HEADLINES_ENDPOINT = 'https://newsapi.org/v2/top-headlines';

const PAGE_SIZE = 5;

articlesRouter.get('/search',
	// Input validation chain 
	query('query').isString().escape(),
	query('pageNum').isInt(),
	async (req, res) => {
		// If there are validation errors, return a 400 response
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(400).json({ error: 'Invalid input' });
		}

		// Fetch articles from the News API based on the search query and page number
		const { query, pageNum } = req.query;
		if (!query) {
			return res.status(400).json({ error: 'Query is required' });
		}
		const response = await fetch(`${NEWS_API_EVERYTHING_ENDPOINT}?q=${query}&apiKey=${NEWS_API_KEY}&sortBy=relevancy&language=en&pageSize=${PAGE_SIZE}&page=${pageNum}`);
		if (response.ok) {
			const articles = await response.json();
			const { totalResults } = articles;
			const totalPages = Math.ceil(totalResults / PAGE_SIZE);
			return res.status(200).json({ ...articles, totalPages });
		}
		return res.status(500).json({ error: 'Internal server error' });
	});

articlesRouter.get('/topics', async (req, res) => {
	// Fetch all topics from the database
	const { data, error } = await supabase.from('topics').select('*');
	if (error) {
		return res.status(500).json({ error: 'Internal server error' });
	}
	return res.status(200).json(data);
});

articlesRouter.get('/top-headlines',
	// Input validation chain
	query('pageNum').isInt().optional(), 
	async (req, res) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(400).json({ error: 'Invalid input' });
		}
		const { pageNum } = req.query;
		const response = await fetch(`${NEWS_API_TOP_HEADLINES_ENDPOINT}?apiKey=${NEWS_API_KEY}&country=us&pageSize=${PAGE_SIZE}&page=${pageNum}`);
		if (response.ok) {
			const articles = await response.json();
			const { totalResults } = articles;
			const totalPages = Math.ceil(totalResults / PAGE_SIZE);
			return res.status(200).json({ ...articles, totalPages });
		}
});

articlesRouter.get('/:topic_id',
	// Input validation chain
	query('pageNum').isInt().optional(),
	param('topic_id').isInt().escape(),
	async (req, res) => {
		// If there are validation errors, return a 400 response
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(400).json({ error: 'Invalid input' });
		}

		// Get topic title from the database based on the topic ID
		const { topic_id } = req.params;
		const { data, error } = await supabase.from('topics_keywords').select('keyword').eq('topic_id', topic_id);
		if (error) {
			return res.status(500).json({ error: 'Internal server error' });
		}
		if (data.length === 0) {
			return res.status(404).json({ error: 'Topic not found' });
		}
		const q = data.map(({ keyword }) => `"${keyword}"`).join(' OR ');
    
		const { pageNum } = req.query;

		// Fetch articles from the News API based on the topic and page number
		const response = await fetch(`${NEWS_API_EVERYTHING_ENDPOINT}?q=${q}&apiKey=${NEWS_API_KEY}&sortBy=relevancy&language=en&pageSize=${PAGE_SIZE}&page=${pageNum}`);
		if (response.ok) {
			const articles = await response.json();
			const { totalResults } = articles;
			const totalPages = Math.ceil(totalResults / PAGE_SIZE);
			return res.status(200).json({ topic_id, ...articles, totalPages });
		}
		return res.status(500).json({ error: 'Internal server error' });
	});



module.exports = articlesRouter;