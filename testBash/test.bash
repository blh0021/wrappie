info=$(node ../index.js env)

sub='TEST=this is a test'

if [[ "$info" == *"$sub"* ]]; then
    echo "Test Passed"
else
    echo "Test Failed"
    exit 1
fi