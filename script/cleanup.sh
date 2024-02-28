stop_containers() {
    running_container=$(docker ps --format "{{.ID}} {{.Names}}" | grep "$(hostname)" | awk '{print $1}')
    if [ -z "$running_container" ]; then
        docker ps -q | xargs -r docker stop
    else
        docker ps -q | grep -v "$running_container" | xargs -r docker stop
    fi
}

cleanup() {
    docker container prune -f
    docker image prune -af
    docker network prune -f
    docker volume prune -f
}

main() {
    set -e
    stop_containers
    cleanup
}

main
