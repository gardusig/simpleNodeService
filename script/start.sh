SERVER_LIST="server_0 server_1 server_2"

cleanup_containers() {
    echo "start cleaning up containers..."
    docker-compose down
    echo "done cleaning up containers"
}

build_images() {
    echo "start building images..."
    docker-compose build -q
    echo "done building images"
}

start_database() {
    echo "start setting up database container..."
    docker-compose up -d --force-recreate db
    sleep 5
    if ! docker-compose ps | grep -q "db"; then
        echo "failed to start database container"
        docker-compose logs db
        exit 1
    fi
    echo "done setting up database container"
}

start_servers() {
    echo "start setting up server container(s)..."
    for server in $SERVER_LIST; do
        echo "start setting up container: ${server}..."
        docker-compose up -d --force-recreate $server
    done
    sleep 10
    for server in $SERVER_LIST; do
        if ! docker-compose ps | grep -q "${server}"; then
            echo "failed to start server: ${server}"
            docker-compose logs ${server}
            exit 1
        fi
        echo "done setting up container: ${server}"
    done
    echo "done setting up server container(s)"
}

start_nginx() {
    echo "start setting up nginx container..."
    docker-compose up -d --force-recreate nginx
    sleep 5
    if ! docker-compose ps | grep -q "nginx"; then
        echo "failed to start nginx container"
        docker-compose logs nginx
        exit 1
    fi
    echo "done setting up nginx container"
}

main() {
    set -e
    cleanup_containers
    build_images
    start_database
    start_servers
    start_nginx
}

main
