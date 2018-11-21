[![Gitter Chat](https://img.shields.io/badge/Gitter-Join%20Chat-3498DB.svg)](https://gitter.im/Alanaktion/phproject?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/2e382a33465448868ca2c0d4b1c937db)](https://www.codacy.com/app/alanaktion/phproject)
[![SensioLabs Insight](https://img.shields.io/sensiolabs/i/51fe626f-4fef-4692-90ea-c0f903aba1b6.svg)](https://insight.sensiolabs.com/projects/51fe626f-4fef-4692-90ea-c0f903aba1b6)
[![Build Status](https://api.travis-ci.org/Alanaktion/phproject.svg)](https://travis-ci.org/Alanaktion/phproject)
[![Crowdin](https://d322cqt584bo4o.cloudfront.net/phproject/localized.png)](https://crowdin.com/project/phproject)

Building Intellect Projects and Issues Manager
=========
*A high-performance project management system in PHP*

### Installation
Git clone this repository in htdocs, go to phpmyadmin in a browser, and create new database buildingintellect-projects.

```sudo chmod 777 BI-projects```

```cd BI-projects```

```composer install```

```sudo chmod -R 777 tmp```

```sudo chmod -R 777 log```

```sudo chmod -R 777 uploads```

```sudo nano /opt/lampp/apache2/conf/httpd.conf```

Add 'Listen 48503' line at the top of configuration.

Add this new header configuration block under the Listens, then save:
```
Header unset X-Frame-Options
Header append X-Frame-Options ALLOWALL
```

```sudo nano /opt/lampp/etc/extra/httpd-vhosts.conf```

Add the new configuration block at the top:
```
<VirtualHost *:48503>
    DocumentRoot "/opt/lampp/htdocs/BI-projects"
    ServerName projects.buildingintellect.local
</VirtualHost>
```

```sudo nano /etc/hosts```

Add new line '127.0.0.1 projects.buildingintellect.local', then save.

```sudo nano /opt/lampp/etc/php.ini```

change the line 'track_errors=On' to 'track_errors=Off' because it is deprecated.

Visit the new virtualhost 'http://projects.buildingintellect.local:48503' in the browser and complete setup process.
