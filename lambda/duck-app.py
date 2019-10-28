#The Lambda function integrates with API gateway and inserts a duck feed record into the Postgres tables hosted on an Amazon RDS instance


import psycopg2
import json

#Define a duck feed object
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


#Define a coonection to the Postgres DB
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


#This function fetches all the records from the ducks table and displays them on the lambda console log
def fetch_all(conn):
    query = "select * from ducks"
    result = []
    cursor = conn.cursor()
    cursor.execute(query)
    raw = cursor.fetchall()
    for line in raw:
        result.append(line)
    return result

#This function inserts a record into the ducks table
def insert(conn, feed: DuckFeed):
    query = "insert into ducks(feed_date,park, food, food_cat, food_qty,duck_count) values('%s','%s','%s','%s','%d','%d')" % (
         feed.time,feed.location, feed.food, feed.type, feed.quantity,feed.count)
    cursor = conn.cursor()
    cursor.execute(query)

#Create a duck feed event
def feed_from_event(event):
    # return DuckFeed(15, "carrot", "vegetable", "Golden Park", 200, "2019-10-25")
    return DuckFeed(event['count'], event['food'], event['type'], event['location'], event['quantity'], event['time'])

#Main
def lambda_handler(event, context):
    conn = create_conn()
    conn.autocommit = True
    insert(conn, feed_from_event(event))
    conn.close()
    return 'true'


#print(lambda_handler('', ''))
