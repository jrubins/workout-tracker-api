# Export backup into processable collections.
cat /Users/jrubins/Documents/personal/workout-tracker/backups/$1.json |  python -c "import sys, json; print(json.load(sys.stdin)['exercises'])" > exercises.json
cat /Users/jrubins/Documents/personal/workout-tracker/backups/$1.json |  python -c "import sys, json; print(json.load(sys.stdin)['users'])" > users.json
cat /Users/jrubins/Documents/personal/workout-tracker/backups/$1.json |  python -c "import sys, json; print(json.load(sys.stdin)['weight'])" > weight.json

# Import MongoDB collections.
mongoimport --db workout-tracker --collection exercises --drop --file ./exercises.json --jsonArray
mongoimport --db workout-tracker --collection users --drop --file ./users.json --jsonArray
mongoimport --db workout-tracker --collection weight --drop --file ./weight.json --jsonArray

# Remove temp files.
rm ./exercises.json
rm ./users.json
rm ./weight.json
