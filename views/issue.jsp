<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="issue">
        <h2>
            <admin:menuItem label="Добави брой и създай таг." title="Брой" url="issue" />
        </h2>
        <form>
            <admin:formItem id="issueBgNameInput" label="Брой" 
            				placeholder="Demo, Reboot, Bloodborne" type="text" />
            <admin:formItem id="issueTagInput" label="Номер" 
            				placeholder="1, 2, 99, 100, 235" type="text" />
            <h3>Скрити стойности</h3>
            <admin:formItem id="issueSaveIdInput" label="Идентификатор на записа" type="hidden" value="" />
        </form>
        <div role="toolbar">
        	<button class="new" type="button">Нов</button>
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
