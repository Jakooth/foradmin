<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="book">
        <h2>
            <admin:menuItem label="Добави информация за книгата и създай таг." title="Книга" url="book" />
        </h2>
        <form>
        	<div class="Main" role="group">
                <div class="file">
                    <label><span class="clip">Избери</span>
                        <input id="bookMainInput" type="file" />
                    </label>
                </div>
            </div>
            <admin:formItem id="bookEnNameInput" label="Оригинално име на книгата" 
            				placeholder="Villa Triste" type="text" />
            <admin:formItem id="bookBgNameInput" label="Име на книгата на български" 
            				placeholder="Вила Тъга" type="text" />
            <admin:formItem id="bookSerieInput" label="Поредица" 
            				placeholder="a-song-of-ice-and-fire, Discworld" type="text" 
                            autocomplete="off" url="serie" layout="one-col" />             
            <admin:formItem id="bookArtistInput" label="Автор" 
            				placeholder="Патрик Модиано" type="text" 
                            autocomplete="off" url="person" layout="one-col" />
            <admin:formItem id="bookTranslatorInput" label="Преводач" 
            				placeholder="" type="text" 
                            autocomplete="off" url="person" layout="one-col" />                
            <admin:formItem id="bookTagInput" label="Таг" 
            				placeholder="sacrifice-to-venus" type="text" />
            <admin:formItem id="bookStickersInput" label="Стикери" 
            				placeholder="Broadsword, Soccer ball, Female elf face" type="text" />
            <admin:formItem id="bookGenreGroup" label="Жанр" type="group">
                <!--AdminManager.js-->
            </admin:formItem>
            <admin:formItem id="bookCountrySelect" label="Държава" 
            				type="select" layout="two-cols" />
            <admin:formItem id="bookDateInput" label="Дата на издаване" 
            				type="date" layout="two-cols" />
            <admin:formItem id="bookSimilarInput" label="Подобни" 
            				placeholder="The Golden Hour, the-last-telegram" 
                            type="text" autocomplete="off" />
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>