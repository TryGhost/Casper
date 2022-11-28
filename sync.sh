#!/bin/sh
#ssh ojweb@freddielx 'export PATH=/home/ojweb/.volta/bin:/bin:/usr/bin;cd ojghost/content/themes/oj-ghost-theme && git pull && cd ~/ojghost && ghost restart'
ssh ojweb@freddielx 'export PATH=/home/ojweb/.volta/bin:/bin:/usr/bin;cd ojghost/content/themes/; rm -rf oj-ghost-theme && git clone https://github.com/olten-jetzt/oj-ghost-theme.git && cd ~/ojghost && ghost restart'
