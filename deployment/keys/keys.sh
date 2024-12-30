#!/bin/bash

mkdir -p ./accessToken
mkdir -p ./refreshToken

# Tạo cặp key cho accessToken
openssl genrsa -out ./accessToken/keypair.pem 2048
openssl rsa -in ./accessToken/keypair.pem -pubout -out ./accessToken/publicKey.pem
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in ./accessToken/keypair.pem -out ./accessToken/privateKey.pem

# Tạo cặp key cho refreshToken
openssl genrsa -out ./refreshToken/keypair.pem 2048
openssl rsa -in ./refreshToken/keypair.pem -pubout -out ./refreshToken/publicKey.pem
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in ./refreshToken/keypair.pem -out ./refreshToken/privateKey.pem