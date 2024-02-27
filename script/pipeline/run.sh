target="$1"

echo "start building pipeline ${target} image..."
docker build \
    -q \
    -t pipeline \
    -f script/pipeline/Dockerfile \
    --target "$target" \
    .
echo "done building pipeline ${target} image"

docker run -v /var/run/docker.sock:/var/run/docker.sock pipeline
