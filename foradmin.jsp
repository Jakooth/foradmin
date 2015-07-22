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
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Foradmin</title>
    <link rel="stylesheet" type="text/css" href="assets/bootstrap-tagsinput.css" />
    <link rel="stylesheet" type="text/css" href="assets/typeaheadjs.css" />
    <link rel="stylesheet" type="text/css" href="assets/foradmin.css" />
    <script src="../jslib/jquery-1.11.0.min.js">
                <!--script-->
            </script>
    <script src="jslib/jquery-ui.min.js">
                <!--script-->
            </script>
    <script src="../jslib/jquery.xml2json.js">
			<!--script-->
		</script>
    <script src="../jslib/jsrender.min.js">
                <!--script-->
            </script>
    <script src="jslib/angular.min.js">
                <!--script-->
            </script>
    <script src="jslib/bootstrap.min.js">
                <!--script-->
            </script>
    <script src="jslib/bootstrap-tagsinput.min.js">
                <!--script-->
            </script>
    <script src="jslib/bootstrap-tagsinput-angular.min.js">
                <!--script-->
            </script>
    <script src="jslib/typeahead.bundle.js">
                <!--script-->
            </script>
    <script src="jslib/ckeditor/ckeditor.js">
                <!--script-->
            </script>
    <script src="../controllers/utils.js?v=1.5.1">
                <!--script-->
            </script>
    <script src="controllers/foradmin.js?v=1.6.1">
                <!--script-->
            </script>
    <script src="controllers/add.js?v=1.0.0">
                <!--script-->
            </script>
    <script src="controllers/objects/layout.js?v=1.0.0">
                <!--script-->
            </script>
    <script src="controllers/objects/article.js?v=1.0.0">
                <!--script-->
            </script>
    <script src="controllers/objects/game.js?v=1.0.0">
                <!--script-->
            </script>
	<script src="controllers/objects/movie.js?v=1.0.0">
                <!--script-->
            </script> 
    <script src="controllers/objects/album.js?v=1.0.0">
                <!--script-->
            </script>
    <script src="controllers/objects/book.js?v=1.0.0">
                <!--script-->
            </script>
	<script src="controllers/objects/event.js?v=1.0.0">
                <!--script-->
            </script>                    
	<script src="controllers/objects/quote.js?v=1.0.0">
                <!--script-->
            </script>
    <script src="controllers/objects/aside.js?v=1.0.0">
                <!--script-->
            </script> 
	<script src="controllers/objects/fortag.js?v=1.0.0">
                <!--script-->
            </script> 
	<script src="controllers/objects/forobject.js?v=1.0.0">
                <!--script-->
            </script> 
	<script>$(document).ready(function() { 
				window.utils = new UtilsManager(); 
				window.admin = new AdminManager(); 
				window.add = new AddManager(); });</script>
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
            <button role="link" class="logout" type="button">Изход</button>
        </div>
        <nav aria-label="Създаване на обекти">
            <h2>Създаване на обекти</h2>
            <ul>
                <li>
                    <admin:menuItem label="Игри" url="games"
                    				icon="lorc,battle-axe" />
                </li>
                <li>
                    <admin:menuItem label="Кино и Сериали" url="movies" 
                    				icon="lorc,shark-jaws" />
                </li>
                <li>
                    <admin:menuItem label="Музика" url="music" 
                    				icon="lorc,guitar" />
                </li>
                <li>
                    <admin:menuItem label="Книги" url="books" 
                    				icon="lorc,book-cover" />
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
                    <admin:menuItem label="Статия" url="article" 
                    				icon="delapouite,pencil" />
                </li>
                <li>
                    <admin:menuItem label="Картинки" url="images" 
                    				icon="lorc,mountains" />
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
                    <admin:menuItem label="Цитат" url="quote" 
                    				icon="lorc,conversation" />
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
        <jsp:include page="views/music.jsp" />
        <jsp:include page="views/album.jsp" />
        <jsp:include page="views/event.jsp" />
        <jsp:include page="views/books.jsp" />
        <jsp:include page="views/book.jsp" />
        <jsp:include page="views/boards.jsp" />
        <jsp:include page="views/article.jsp" />
        <jsp:include page="views/aside.jsp" />
        <jsp:include page="views/images.jsp" />
        <jsp:include page="views/quote.jsp" />
        <jsp:include page="views/search.jsp" />
        <jsp:include page="views/publish.jsp" />
        <jsp:include page="views/xml.jsp" />
        <jsp:include page="views/url.jsp" />
    </main>
    <footer>
        <p>&amp;copy; Copyright 2015 <a href="http://forplay.bg?video=castle-design">Castle
                Design Ltd.</a> </p>
        <p>Тази страница се придържа към <a href="http://www.mandate376.eu/">Европейските
                Изисквания за Достъпност на Обществени Продукти и Услуги.</a> </p>
    </footer>
    <div class="Overlay">
        <!--foradmin.js-->
    </div>
    </body>
    </html>
</jsp:root>
