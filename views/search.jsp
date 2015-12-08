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
                            type="search" autocomplete="off" layout="two-cols" />
            <admin:formItem id="searchObjectSelect" label="Категория" 
            				type="select" layout="two-cols">
                <option value="">Всички</option>
                <option value="tag">Таг</option>
                <option value="article">Статия</option>
                <option value="aside">Каре</option>
                <option disabled="img" value="for_imgs">Картинка</option>
                <option disabled="quote" value="for_articles">Цитат</option>
            </admin:formItem>
            <admin:formItem id="searchTypeSelect" label="Тип" 
            				type="select" layout="two-cols">
                <option value="">Всички</option>
            </admin:formItem>
            <admin:formItem id="searchSubtypeSelect" label="Подтип" 
            				type="select" layout="two-cols">
                <option value="">Всички</option>
            </admin:formItem>
            <h3 class="clip">Резултати</h3>
            <ul role="listbox">
                <!--AddManager-->
            </ul>
        </form>
        <div role="toolbar">
            <button class="ok" type="button">Избери</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
