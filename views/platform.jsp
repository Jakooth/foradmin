<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="platform">
        <h2>
            <admin:menuItem label="Добави платформа и създай таг." title="Платформа" url="platform" />
        </h2>
        <form>
            <admin:formItem id="platformEnNameInput" label="Платформа" 
            				placeholder="Xbox 360, PlayStation 4, Android" type="text" />
            <admin:formItem id="platformTagInput" label="Таг" 
            				placeholder="360, ps4, android" type="text" />
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
