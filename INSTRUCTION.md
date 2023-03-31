# Recruitment task - coding

The main goal is to implement a small application that presents a line/bar chart with Norway parameters on the average
price per square meter fetched from https://data.ssb.no.

A user has to be able to provide parameters like quarters range and house type. These parameters have to be reflected in
the URL, so users can share the URL with others.

Moreover, these parameters should be persisted between browser sessions so users don't have to select them for every
visit.

UI should somehow limit users from providing quarter values earlier than 2009K1.

We would like you also to add the possibility to save parameters for further use with the possibility to add and edit single comment for the presented parameters. The comment may be stored in Local Storage, so it can be later used when viewing the parameters.

### For example

- quarters range: 2016K1-2021K4
- house type: Småhus

| Type of property | API value |
| :--------------- | :-------: |
| Boliger i alt    |   '00'    |
| Småhus           |   '02'    |
| Blokkleiligheter |   '03'    |

### Example request to API

```
curl -X POST --location "https://data.ssb.no/api/v0/no/table/07241" \
-H "Content-Type: application/json" \
-d "{
        "query": [
            {
                "code": "Boligtype",
                "selection": {
                    "filter": "item",
                    "values": [
                        "00"
                    ]
                }
            },
            {
                "code": "ContentsCode",
                "selection": {
                "filter": "item",
                    "values": [
                        "KvPris"
                    ]
                }
            },
            {
                "code": "Tid",
                "selection": {
                    "filter": "item",
                    "values": [
                        "2020K1",
                        "2020K2",
                        "2020K3",
                        "2020K4",
                        "2021K1",
                        "2021K2",
                        "2021K3",
                        "2021K4"
                    ]
                }
            }
        ],
        "response": {
            "format": "json-stat2"
        }
    }"

```

## Libraries

We would like you to use some additional libraries for this task (included in package.json)

- material-ui
- react-hook-form

## Type-script

Please don't forget about typings!
