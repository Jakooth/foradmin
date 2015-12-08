<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="event">
        <h2>
            <admin:menuItem label="Добави информация за събитието и създай таг." title="Събитие" url="event" />
        </h2>
        <form>
            <div class="Main" role="group">
                <div class="file">
                    <label>
                        <span class="clip">Избери</span>
                        <input id="eventMainInput" type="file" />
                    </label>
                </div>
            </div>
            <admin:formItem id="eventEnNameInput" label="Събитие" 
            				placeholder="Sofia Rocks 2015" type="text" />
            <admin:formItem id="eventTagInput" label="Таг" 
            				placeholder="sofia-rocks-2015" type="text" />
            <admin:formItem id="eventBgNameInput" label="Име на български" 
            				placeholder="" type="text" />
            <admin:formItem id="eventArtistInput" label="Изпълнители" 
            				placeholder="Emil Bulls" type="text" 
                            autocomplete="off" url="band" layout="one-col" />
            <admin:formItem id="eventSerieInput" label="Поредица" 
            				placeholder="sofia-rocks" type="text" 
                            autocomplete="off" url="serie" layout="one-col" />
            <admin:formItem id="eventStickersInput" label="Стикери" 
            				placeholder="Broadsword, Soccer ball, Female elf face" type="text" />
            <admin:formItem id="eventGenreGroup" label="Жанр" type="group">
                <!--AdminManager-->
            </admin:formItem>
            <admin:formItem id="eventDateInput" label="Начало" 
            				type="date" layout="two-cols" />
            <admin:formItem id="eventEndDateInput" label="Край" 
            				type="date" layout="two-cols" />
            <admin:formItem id="eventCountrySelect" label="Държава" 
            				type="select" layout="two-cols" />
            <admin:formItem id="eventCityInput" label="Град" 
            				placeholder="София, Каварна" 
                            type="text" layout="two-cols" />
            <admin:formItem id="eventSimilarInput" label="Подобни" 
            				placeholder="" 
                            type="text" autocomplete="off" />
        	<h3>Скрити стойности</h3>
            <admin:formItem id="eventTypeSelect" label="Тип" type="hidden" value="music" />
            <admin:formItem id="eventSaveIdInput" label="Идентификатор на записа" type="hidden" value="" />
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
