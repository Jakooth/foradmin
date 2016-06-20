<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <c:set var="language" value="${not empty param.language 
			? param.language : not empty language 
			? language : pageContext.request.locale}" scope="session" />
    <fmt:setLocale 	value="${language}" />
    <fmt:setBundle 	basename="i18n.text" var="lang" scope="session" />
    <jsp:output 	doctype-root-element="html" 
					doctype-system="" />
    <jsp:directive.page contentType="text/html"/>
    <html lang="${language}">
        <head>
            <meta content="charset=utf-8" />
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=yes" />
            <title>Foradmin</title>
            <link rel="stylesheet" type="text/css" href="assets/bootstrap-tagsinput.css" />
            <link rel="stylesheet" type="text/css" href="assets/typeaheadjs.css" />
            <link rel="stylesheet" type="text/css" href="assets/foradmin.css" />
            <script src="/jslib/jquery-2.1.4.min.js">
                <!--script-->
            </script>
            <script src="jslib/jquery-ui.min.js">
                <!--script-->
            </script>
            <script src="/jslib/jsrender.min.js">
                <!--script-->
            </script>
            <script src="//cdn.auth0.com/js/lock-9.2.1.min.js">
                <!--script-->
            </script>
            <script src="jslib/typeahead.bundle.min.js">
                <!--script-->
            </script>
            <script src="jslib/bootstrap-tagsinput.min.js">
                <!--script-->
            </script>
            <script src="jslib/ckeditor/ckeditor.js">
                <!--script-->
            </script>
            <script src="/jslib/he.js">
                <!--script-->
            </script>
            <script src="/controllers/utils.js?v=2.0.0">
                <!--script-->
            </script>
            <script src="controllers/foradmin.js?v=2.0.0">
                <!--script-->
            </script>
            <script src="controllers/add.js?v=2.0.0">
                <!--script-->
            </script>
            <script src="controllers/search.js?v=2.0.0">
                <!--script-->
            </script>
            <script src="controllers/log.js?v=2.0.1">
                <!--script-->
            </script>
            <script src="controllers/login.js?v=2.0.0">
                <!--script-->
            </script>
            <script src="controllers/imgs.js?v=2.0.1">
                <!--script-->
            </script>
            <script src="controllers/objects/fortag.js?v=2.1.0">
                <!--script-->
            </script>
            <script src="controllers/objects/formain.js?v=2.0.0">
                <!--script-->
            </script>
            <script src="controllers/objects/layout.js?v=2.0.0">
                <!--script-->
            </script>
            <script src="controllers/objects/aside.js?v=2.0.0">
                <!--script-->
            </script>
            <script src="controllers/objects/article.js?v=2.0.1">
                <!--script-->
            </script>
            <script src="controllers/objects/quote.js?v=2.0.0">
                <!--script-->
            </script>
            <script src="controllers/objects/game.js?v=2.0.0">
                <!--script-->
            </script>
            <script src="controllers/objects/movie.js?v=2.0.0">
                <!--script-->
            </script>
            <script src="controllers/objects/album.js?v=2.0.0">
                <!--script-->
            </script>
            <script src="controllers/objects/event.js?v=2.0.0">
                <!--script-->
            </script>
            <script src="controllers/objects/book.js?v=2.0.0">
                <!--script-->
            </script>
            <script src="controllers/objects/platform.js?v=2.0.0">
                <!--script-->
            </script>
            <script src="controllers/objects/genre.js?v=2.0.0">
                <!--script-->
            </script>
            <script src="controllers/objects/sticker.js?v=2.0.0">
                <!--script-->
            </script>
            <script src="controllers/objects/author.js?v=2.0.0">
                <!--script-->
            </script>
            <script src="controllers/objects/issue.js?v=2.0.0">
                <!--script-->
            </script>
            <script src="controllers/objects/country.js?v=2.0.0">
                <!--script-->
            </script>
            <script src="controllers/INIT.js?v=2.0.0">
                <!--script-->
            </script>
        </head>
        <body>
            <header id="main">
                <h1 class="clip">
                    <admin:menuItem label="Основно меню" url="main" 
            				icon="lorc,magic-portal" 
                            clipLabel="clip" />
                </h1>
                <div role="toolbar">
                    <button role="link" class="search" type="button">Търсене</button>
                    <button role="link" class="log" type="button">Активност</button>
                    <div role="group">
                    	<button role="link" class="login" type="button">Влез</button>
                        <button role="link" class="logout" type="button">Излез</button>
                    </div>
                </div>
                <nav aria-label="Създаване на тагове">
                    <h2>Създаване на тагове</h2>
                    <ul>
                        <li>
                            <admin:menuItem label="Игри" url="games"
                    				icon="delapouite,joystick" />
                        </li>
                        <li>
                            <admin:menuItem label="Кино и Телевизия" url="movies" 
                    				icon="delapouite,clapperboard" />
                        </li>
                        <li>
                            <admin:menuItem label="Музика" url="music" 
                    				icon="lorc,music-spell" />
                        </li>
                        <li>
                            <admin:menuItem label="Книги" url="books" 
                    				icon="delapouite,bookshelf" />
                        </li>
                        <li>
                            <admin:menuItem label="Настолни Игри" url="boards" 
                    				icon="lorc,dragon-head" />
                        </li>
                    </ul>
                </nav>
                <nav aria-label="Добавяне на информация">
                    <h2>Добавяне на информация</h2>
                    <ul>
                        <li>
                            <admin:menuItem label="Новини и Статии" url="article" 
                    				icon="lorc,papers" />
                        </li>
                        <li>
                            <admin:menuItem label="Картинки" url="images" 
                    				icon="delapouite,photo-camera" />
                        </li>
                        <li>
                            <admin:menuItem label="Каре" url="aside" 
                    				icon="lorc,checkbox-tree"/>
                        </li>
                        <li>
                            <admin:menuItem label="Реклама" url="advert" 
                    				icon="delapouite,piggy-bank" />
                        </li>
                        <li>
                            <admin:menuItem label="Цитати и факти" url="quote" 
                    				icon="lorc,conversation" />
                        </li>
                        <li>
                            <admin:menuItem label="Автор" url="author" 
                    				icon="lorc,fountain-pen" />
                        </li>
                        <li>
                            <admin:menuItem label="Брой" url="issue" 
                    				icon="delapouite,calendar" />
                        </li>
                    </ul>
                </nav>
                <nav class="breadcrumb" aria-label="Бърза навигация назад">
                    <ul>
                        <!--foradmin.js-->
                    </ul>
                </nav>
            </header>
            <main>
            	<jsp:include page="views/fortag.jsp" />
                <jsp:include page="views/games.jsp" />
                <jsp:include page="views/game.jsp" />
                <jsp:include page="views/company.jsp" />
                <jsp:include page="views/platform.jsp" />
                <jsp:include page="views/person.jsp" />
                <jsp:include page="views/character.jsp" />
                <jsp:include page="views/serie.jsp" />
                <jsp:include page="views/dlc.jsp" />
                <jsp:include page="views/genre.jsp" />
                <jsp:include page="views/movies.jsp" />
                <jsp:include page="views/movie.jsp" />
                <jsp:include page="views/tv.jsp" />
                <jsp:include page="views/music.jsp" />
                <jsp:include page="views/album.jsp" />
                <jsp:include page="views/event.jsp" />
                <jsp:include page="views/band.jsp" />
                <jsp:include page="views/books.jsp" />
                <jsp:include page="views/book.jsp" />
                <jsp:include page="views/boards.jsp" />
                <jsp:include page="views/board.jsp" />
                <jsp:include page="views/article.jsp" />
                <jsp:include page="views/aside.jsp" />
                <jsp:include page="views/images.jsp" />
                <jsp:include page="views/quote.jsp" />
                <jsp:include page="views/search.jsp" />
                <jsp:include page="views/publish.jsp" />
                <jsp:include page="views/xml.jsp" />
                <jsp:include page="views/author.jsp" />
                <jsp:include page="views/issue.jsp" />
                <jsp:include page="views/country.jsp" />
                <jsp:include page="views/sticker.jsp" />
                <jsp:include page="views/log.jsp" />
            </main>
            <footer>
                <p>&amp;copy; Copyright 2015
                    <a href="http://forplay.bg/articles/games/news/18/castle-design">Castle
                        Design Ltd.</a>
                </p>
                <p>Тази страница се придържа към
                    <a href="http://www.cencenelec.eu/News/Press_Releases/Pages/PR-2014-03.aspx">Европейските
                        Изисквания за Достъпност на Обществени Продукти и Услуги.</a>
                </p>
                <p>Икони за кориците благодарение на
                    <a href="http://game-icons.net/">Game-icons.net.</a>
                </p>
            </footer>
        </body>
    </html>
</jsp:root>
