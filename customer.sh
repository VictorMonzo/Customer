#!/bin/bash

npm run build
scp -r -P 443 dist/* customer@www.g06.batoilogic.es:/var/www/customer/html
