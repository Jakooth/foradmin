<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="serie">
        <h2>
            <admin:menuItem label="Добави поредица и създай таг." title="Поредица" url="serie" />
        </h2>
        <form>
            <admin:formItem id="serieNameInput" label="Поредица" 
            				placeholder="Grand Theft Auto, Halo, Батман, Песен за Огън и Лед, Истории от Света на Диска" type="text" />
            <admin:formItem id="serieTagInput" label="Таг" 
            				placeholder="gta, halo, star-wars, batman, a-song-of-ice-and-fire, discworld" type="text" />
        	<admin:formItem id="serieTypeSelect" label="Тип" type="select"/>
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
