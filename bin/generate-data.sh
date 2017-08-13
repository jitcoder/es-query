curl -X DELETE "http://localhost:9200/_all"

curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '{
"description": "Apple",
"price": 1.00
}' "localhost:9200/sales/item/"


curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '{
"description": "Orange",
"price": 2.00
}' "localhost:9200/sales/item/"