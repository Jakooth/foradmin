<?xml version="1.0"?>
<jsp:root xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0" xmlns:c="http://java.sun.com/jsp/jstl/core" xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
    xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <c:set var="language" value="${not empty param.language 
			? param.language : not empty language 
			? language : pageContext.request.locale}" scope="session" />
    <fmt:setLocale value="${language}" />
    <fmt:setBundle basename="i18n.text" var="lang" scope="session" />
    <jsp:output doctype-root-element="html" doctype-system="" />
    <jsp:directive.page contentType="text/html" />
    <html lang="${language}">

    <head>
        <meta content="charset=utf-8" />
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Foradmin</title>
        <link rel="stylesheet" type="text/css" href="assets/foradmin.css" />
        <script src="/jslib/jquery-2.1.4.min.js">
            <!--script-->
        </script>
        <script src="https://cdn.auth0.com/js/auth0/9.5.1/auth0.min.js">
            <!--script-->
        </script>
        <script src="hhttps://cdn.auth0.com/js/lock/11.6.1/lock.min.js">
            <!--script-->
        </script>
        <script src="/controllers/utils.js?v=3.0.0">
            <!--script-->
        </script>
        <script src="controllers/login.js?v=3.0.0">
            <!--script-->
        </script>
        <script>
            $(document).ready(function () {
                window.utils = new UtilsManager();
                window.login = new LoginManager();
            });
        </script>
    </head>

    <body>
        <main>
            <section id="login">
                <h1>
                    <img class="svg" src="../assets/forplay.svg" alt="Forplay&amp;reg;" />
                </h1>
                <div role="toolbar">
                    <button class="login" type="button">Администрация</button>
                </div>
            </section>
        </main>
        <footer>
            <p>&amp;copy; Copyright 2015
                <a href="http://forplay.bg?video=castle-design">Castle Design Ltd.
                </a>
            </p>
            <p>Тази страница се придържа към
                <a href="http://www.cencenelec.eu/News/Press_Releases/Pages/PR-2014-03.aspx">Европейските Изисквания за Достъпност на Обществени Продукти и Услуги.</a>
            </p>
            <p>Икони за кориците благодарение на
                <a href="http://game-icons.net/">Game-icons.net.</a>
            </p>
        </footer>
    </body>

    </html>
</jsp:root>