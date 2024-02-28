cleanup_containers() {
    echo "start cleaning up containers..."
    docker-compose down
    echo "done cleaning up containers"
}

run_e2e_tests() {
    echo "start running tests..."
    for i in $(seq 0 2); do
        echo "start running test batch ${i}..."
        sleep $((5 * i))
        docker-compose run e2e
        echo "done running test batch ${i}"
    done
    echo "done running tests"
}

main() {
    set -e
    run_e2e_tests
    cleanup_containers
}

main
