<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="search">
        <h2>
            <admin:menuItem label="Намери игра, филм, статия, каре, картинка и т.н." 
            				title="Търсене" url="search" />
        </h2>
        <form>
            <admin:formItem id="searchTagInput" label="Таг" 
            				placeholder="gta-5, sam-houser, rockstar" 
                            type="search" autocomplete="off" />
            <admin:formItem id="searchTableSelect" label="Категория" 
            				type="select">
                <option value="">Всички категории</option>
                <option value="tags">таг</option>
                <option value="articles">статия</option>
                <option value="genres">жанр</option>
                <option value="platforms">платформа</option>
                <option value="stickers">стикери</option>
                <option disabled="disabled" value="imgs">картинка</option>
            </admin:formItem>
            <admin:formItem id="searchTypeSelect" label="Тип" 
            				type="select">
                <option value="">Всички типове</option>
            </admin:formItem>
            <admin:formItem id="searchSubtypeSelect" label="Подтип" 
            				type="select">
                <option value="">Всички подтипове</option>
                <option value="aside">каре</option>
                <option value="quote">цитат</option>
            </admin:formItem>
            <h3 class="clip">Резултати</h3>
            <ul role="listbox">
                <!--AdminManager-->
            </ul>
        </form>
        <div role="toolbar">
        	<admin:formItem id="searchValignSelect" label="Позициониране" 
            				type="select">
                <option value="top">Горе</option>
                <option value="bottom">Долу</option>
            </admin:formItem>
            <button class="ok" type="button">Избери</button>
            <button class="cancel" type="button">Отмени</button>
            <button class="remove" type="button">Премахни</button>
        </div>
    </section>
</jsp:root>
