<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="country">
        <h2>
            <admin:menuItem label="Добави държава и създай таг." title="Държава" url="country" />
        </h2>
        <form>
            <admin:formItem id="countryBgNameInput" label="Държава" 
            				placeholder="България, САЩ, Великобритания" type="text" />
            <admin:formItem id="countryTagInput" label="Таг" 
            				placeholder="bg, us, gb" type="text" />
            <h3>Скрити стойности</h3>
            <admin:formItem id="countrySaveIdInput" label="Идентификатор на записа" type="hidden" value="" />
        </form>
        <div role="toolbar">
        	<button class="new" type="button">Нова</button>
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
