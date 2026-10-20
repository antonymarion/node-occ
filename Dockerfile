# Build node-occ against system OpenCascade and run it on two Node binaries:
# official Node (no pointer compression) and platformatic/node-caged.
FROM platformatic/node-caged:26

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    python3 \
    pkg-config \
    ca-certificates \
    curl \
    xz-utils \
    libocct-data-exchange-dev \
    libocct-foundation-dev \
    libocct-modeling-algorithms-dev \
    libocct-modeling-data-dev \
    libocct-ocaf-dev \
  && rm -rf /var/lib/apt/lists/*

# Stock Node is the non-compressed baseline and the toolchain (npm/node-gyp).
# The caged binary stays where the image installed it.
ARG NODE_STOCK_VERSION=22.21.0
RUN command -v node > /opt/caged-node-path \
 && curl -fsSL "https://nodejs.org/dist/v${NODE_STOCK_VERSION}/node-v${NODE_STOCK_VERSION}-linux-x64.tar.xz" \
    | tar -xJ -C /opt \
 && mv /opt/node-v${NODE_STOCK_VERSION}-linux-x64 /opt/node-stock
ENV PATH="/opt/node-stock/bin:${PATH}"

WORKDIR /src
COPY package.json binding.gyp ./
COPY scripts ./scripts
COPY src ./src
COPY lib ./lib
COPY index.js ./
RUN npm install --ignore-scripts && npx node-gyp rebuild

COPY test ./test
COPY bench ./bench
ENV LD_LIBRARY_PATH=/usr/lib/x86_64-linux-gnu
CMD ["node", "bench/memory.js"]
