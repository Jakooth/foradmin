<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="album">
        <h2>
            <admin:menuItem label="Добави информация за албума и създай таг." title="Албум" url="album" />
        </h2>
        <form>
            <div class="Main" role="group">
                <div class="file">
                    <label>
                        <span class="clip">Избери</span>
                        <input id="albumMainInput" type="file" />
                    </label>
                </div>
                <div class="file">
                    <label>
                        <span class="clip">Избери</span>
                        <input id="albumCoverInput" type="file" data-subtype="album" />
                    </label>
                </div>
            </div>
            <admin:formItem id="albumEnNameInput" label="Албум" 
            				placeholder="Sacrifice To Venus" type="text" />
            <admin:formItem id="albumTagInput" label="Таг" 
            				placeholder="sacrifice-to-venus" type="text" />
            <admin:formItem id="albumBgNameInput" label="Име на български" 
            				placeholder="" type="text" />
            <admin:formItem id="albumSiteInput" label="Сайт или Уикипедиа" 
            				placeholder="https://en.wikipedia.org/wiki/Manslaughter_(album)" type="text" />
            <admin:formItem id="albumArtistInput" label="Изпълнител" 
            				placeholder="Emil Bulls" type="text" 
                            autocomplete="off" url="person" layout="one-col" />
            <admin:formItem id="albumStickersInput" label="Стикери" 
            				placeholder="Broadsword, Soccer ball, Female elf face" type="text" />
            <admin:formItem id="albumGenreGroup" label="Жанр" type="group">
                <!--AdminManager-->
            </admin:formItem>
            <admin:formItem id="albumCountrySelect" label="Държава" 
            				type="select" layout="two-cols" />
            <admin:formItem id="albumDateInput" label="Дата на издаване" 
            				type="date" layout="two-cols" />
            <admin:formItem id="albumRelatedInput" label="Подобни" 
            				placeholder="" 
                            type="text" autocomplete="off" />
            <h3>Траклист</h3>
            <div class="Add Tracklist">
                <button class="add" type="button">Добави трак</button>
            </div>
            <h3>Скрити стойности</h3>
            <admin:formItem id="albumTypeSelect" label="Тип" type="hidden" value="music" />
            <admin:formItem id="albumSaveIdInput" label="Идентификатор на записа" type="hidden" value="" />
            <admin:formItem id="albumSaveRelatedInput" label="Свързани" type="hidden" value="" />
            <admin:formItem id="albumSaveTracksInput" label="Тракове" type="hidden" value="" />
        </form>
        <div role="toolbar">
        	<button class="new" type="button">Нов</button>
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
