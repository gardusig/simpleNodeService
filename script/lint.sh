stop_containers() {
    echo "starting to stop containers..."
    docker-compose down
    echo "done stopping containers..."
}

build_images() {
    echo "start building lint image..."
    docker-compose build -q lint
    echo "done building lint image"
}

run_lint() {
    echo "start running lint..."
    docker-compose run lint
    echo "done running lint"
}

main() {
    set -e
    stop_containers
    build_images
    run_lint
    stop_containers
}

main
