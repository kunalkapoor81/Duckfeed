import psycopg2
import json


class DuckFeed(object):
    count = 0
    food = ""
    type = 0
    location = ""
    quantity = 0
    time = ""

    def __init__(self, count, food, type, location, quantity, time):
        self.count = count
        self.food = food
        self.type = type
        self.location = location
        self.quantity = quantity
        self.time = time


def create_conn():
    conn = None
    try:
        conn = psycopg2.connect(user="postgres",
                                password="Duckling",
                                host="duck-behavior.cxnvfhymnyl6.ap-south-1.rds.amazonaws.com",
                                port="5432",
                                database="postgres"
                                )

    except:
        print("Cannot connect.")
    return conn


def fetch_all(conn):
    query = "select * from ducks"
    result = []
    cursor = conn.cursor()
    cursor.execute(query)
    raw = cursor.fetchall()
    for line in raw:
        result.append(line)
    return result


def insert(conn, feed: DuckFeed):
    query = "insert into ducks(feed_date,park, food, food_cat, food_qty,duck_count) values('%s','%s','%s','%s','%d','%d')" % (
         feed.time,feed.location, feed.food, feed.type, feed.quantity,feed.count)
    cursor = conn.cursor()
    cursor.execute(query)


def feed_from_event(event):
    # return DuckFeed(15, "carrot", "vegetable", "Golden Park", 200, "2019-10-25")
    return DuckFeed(event['count'], event['food'], event['type'], event['location'], event['quantity'], event['time'])


def lambda_handler(event, context):
    conn = create_conn()
    conn.autocommit = True
    insert(conn, feed_from_event(event))
    conn.close()
    return 'true'


#print(lambda_handler('', ''))
