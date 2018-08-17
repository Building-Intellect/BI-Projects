[![Gitter Chat](https://img.shields.io/badge/Gitter-Join%20Chat-3498DB.svg)](https://gitter.im/Alanaktion/phproject?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/2e382a33465448868ca2c0d4b1c937db)](https://www.codacy.com/app/alanaktion/phproject)
[![SensioLabs Insight](https://img.shields.io/sensiolabs/i/51fe626f-4fef-4692-90ea-c0f903aba1b6.svg)](https://insight.sensiolabs.com/projects/51fe626f-4fef-4692-90ea-c0f903aba1b6)
[![Build Status](https://api.travis-ci.org/Alanaktion/phproject.svg)](https://travis-ci.org/Alanaktion/phproject)
[![Crowdin](https://d322cqt584bo4o.cloudfront.net/phproject/localized.png)](https://crowdin.com/project/phproject)

Interested in **managed hosting**? [Take a brief survey](https://docs.google.com/forms/d/e/1FAIpQLSdzsvlbmLm4hgkWXspXVW7hyCb4CNTItNaC7LdVpyM1r48EmQ/viewform) to help us know what to build!

Building Intellect Issues Manager
=========
*A high-performance project management system in PHP*

### Installation
Git clone this repository in htdocs, go to phpmyadmin in a browser, and create new database buildingintellect-issues.

```cd BI-issues```

```composer install```

```sudo chmod -R 777 tmp```

```sudo chmod 777 app/model/config.php```

```sudo nano /opt/lampp/apache2/conf/httpd.conf```

Add 'Listen 48503' line at the top of configuration, then save.

```sudo nano /opt/lampp/etc/extra/httpd-vhosts.conf```

Add the new configuration block below 48501 block:
```
<VirtualHost *:48503>
    DocumentRoot "/opt/lampp/htdocs/BI-issues"
    ServerName bi-issues.local
</VirtualHost>
```

Visit the new virtualhost in the browser and complete setup process [phproject.org](http://www.phproject.org/install.html).

### Development
Phproject uses [Composer](https://getcomposer.org/) for dependency management. After cloning the repository, run `composer install` to install the required packages.

### Contributing
Phproject is maintained as an open source project for use by anyone around the world under the [GNU General Public License](http://www.gnu.org/licenses/gpl-3.0.txt). If you find a bug or would like a new feature added, [open an issue](https://github.com/Alanaktion/phproject/issues/new) or [submit a pull request](https://github.com/Alanaktion/phproject/compare/) with new code. If you want to help with translation, [you can submit translations via Crowdin](https://crowdin.com/project/phproject).
