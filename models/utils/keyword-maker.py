import csv

# Define a dictionary with topic_id and relevant keywords
topics_keywords = {
    1: ["machine learning", "neural networks", "deep learning", "AI", "artificial intelligence", "LLM", "NLP", "natural language processing", "computer vision"],
    2: ["stocks", "investment", "banking", "finance", "economy", "market", "trading", "cryptocurrency", "etf", "blockchain", "stock market", "stock exchange"],
    3: ["elections", "policy", "government", "politics", "voting", "democracy", "republic", "political parties", "political science", "political theory", "political philosophy"],
    4: ["GDP", "inflation", "unemployment", "interest rates", "economy", "economic development", "economic indicators", "economic policy", "economic theory", "economic models", "CPI", "PCE", "Fed", "FOMC", "monetary policy", "fiscal policy", "Federal Reserve", "bank"],
    5: ["innovation", "software", "hardware", "technology", "startups", "venture capital", "Silicon Valley", "tech"],
    6: ["medicine", "wellness", "nutrition", "health", "diet", "exercise", "fitness", "mental health", "public health", "healthcare", "health insurance", "health policy"],
    7: ["research", "experiments", "theory", "scientific method", "hypothesis", "data analysis"],
    8: ["football", "basketball", "tennis", "soccer", "baseball", "athletics"],
    9: ["movies", "music", "celebrities", "TV shows", "concerts", "awards"],
    10: ["global", "international", "diplomacy", "foreign policy", "trade", "geopolitics"],
    11: ["entrepreneurship", "management", "marketing", "startups", "business strategy", "leadership"],
    12: ["schools", "learning", "teaching", "education system", "curriculum", "pedagogy"],
    13: ["climate change", "pollution", "conservation", "sustainability", "renewable energy", "biodiversity"],
    14: ["fashion", "travel", "food", "lifestyle", "wellness", "leisure"],
    15: ["editorial", "commentary", "perspective", "opinion pieces", "analysis", "critique"],
    16: ["destinations", "flights", "hotels", "tourism", "vacations", "travel guides"],
    17: ["traditions", "customs", "heritage", "cultural practices", "festivals", "rituals"],
    18: ["law enforcement", "justice", "criminal", "crime prevention", "legal system", "policing"],
    19: ["forecast", "climate", "temperature", "weather patterns", "meteorology", "climate change"],
    20: ["property", "housing", "mortgage", "real estate market", "home buying", "property investment"],
    21: ["trends", "design", "clothing", "fashion industry", "style", "apparel"],
    22: ["recipes", "cuisine", "restaurants", "cooking", "dining", "food culture"],
    23: ["cars", "trucks", "motorcycles", "automotive industry", "vehicles", "transportation"],
    24: ["events", "chronology", "biography", "historical figures", "historical periods", "milestones"],
    25: ["faith", "belief", "worship", "religious practices", "spirituality", "doctrine"],
    26: ["painting", "sculpture", "gallery", "art exhibitions", "art history", "visual arts"],
    27: ["literature", "novels", "authors", "books", "poetry", "literary criticism"],
    28: ["genres", "artists", "albums", "music industry", "songs", "concerts"],
    29: ["films", "directors", "actors", "cinema", "screenwriting", "film festivals"],
    30: ["shows", "series", "networks", "television industry", "broadcasting", "TV ratings"],
    31: ["plays", "drama", "performance", "theater productions", "playwriting", "stagecraft"],
    32: ["video games", "consoles", "PC gaming", "eSports", "game development", "gaming culture"],
    33: ["superheroes", "manga", "graphic novels", "comic books", "illustrations", "comic strips"]
}

# Create a new list with topic_id and keyword pairs
topic_keyword_pairs = [["topic_id", "keyword"]]
for topic_id, keywords in topics_keywords.items():
    for keyword in keywords:
        topic_keyword_pairs.append([topic_id, keyword])

with open('topics_keywords_pairs.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerows(topic_keyword_pairs)