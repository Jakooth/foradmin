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
                    <label><span class="clip">Избери</span>
                        <input id="albumMainInput" type="file" />
                    </label>
                </div>
            </div>
            <admin:formItem id="albumEnNameInput" label="Оригинално име на албума" 
            				placeholder="Sacrifice To Venus" type="text" />
            <admin:formItem id="albumArtistInput" label="Изпълнител" 
            				placeholder="Emil Bulls" type="text" 
                            autocomplete="off" url="person" layout="one-col" />
            <admin:formItem id="albumTagInput" label="Таг" 
            				placeholder="sacrifice-to-venus" type="text" />
            <admin:formItem id="albumStickersInput" label="Стикери" 
            				placeholder="girl, beer, 18+" type="text" />
            <admin:formItem id="albumGenreGroup" label="Жанр" type="group">
                <!--AdminManager.js-->
            </admin:formItem>
            <admin:formItem id="albumCountrySelect" label="Държава" 
            				type="select" layout="two-cols" />
            <admin:formItem id="albumDateInput" label="Дата на издаване" 
            				type="date" layout="two-cols" />
            <admin:formItem id="albumSimilarInput" label="Подобни" 
            				placeholder="saints-row, mafia, red-dead-redemption, crackdown" 
                            type="text" autocomplete="off" />
            <h3>Траклист</h3>
            <div class="Add Track">
                <button class="add" type="button">Добави трак</button>
            </div>
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
