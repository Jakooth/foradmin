<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="genre">
        <h2>
            <admin:menuItem label="Добави жанр и създай таг." title="Жанр" url="genre" />
        </h2>
        <form>
            <admin:formItem id="genreBgNameInput" label="Жанр" 
            				placeholder="Екшън от първо/трето лице, Куест, ММО, Драма, Комедия, Анимация, Рол, Дийп Хаус, Дрийм Поп, Фентъзи, Новела, Крими,  Научна Фантастика" type="text" />
            <admin:formItem id="genreTagInput" label="Таг" 
            				placeholder="tps, adventure, mmo, drama, comedy, animation, rock, deep-house, dream-pop, novel, fantasy, crime, science-fiction" type="text" />
        	<admin:formItem id="genreTypeSelect" label="Тип" type="select"/>
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
