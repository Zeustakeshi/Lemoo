openssl genrsa -out keypair.pem 2048

openssl rsa -in keypair.pem -pubout -out publicKey.pem

openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in keypair.pem -out privateKey.pem