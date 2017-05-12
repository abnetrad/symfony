FROM vixns/php-nginx:7

COPY htdocs /data
WORKDIR /data

COPY etc/config/php /usr/local/etc/php-fpm.d
COPY etc/config/nginx /etc/nginx/conf.d

RUN docker-php-ext-install pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN curl -O http://download.gna.org/wkhtmltopdf/0.12/0.12.4/wkhtmltox-0.12.4_linux-generic-amd64.tar.xz && \
    tar -xvf wkhtmltox-0.12.4_linux-generic-amd64.tar.xz && \
    mv wkhtmltox/bin/wkhtmlto* /usr/local/bin/ && \
    rm -rf wkhtmltox*

COPY etc/run.sh /run.sh
CMD ["/run.sh"]
