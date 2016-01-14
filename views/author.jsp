<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="author">
        <h2>
            <admin:menuItem label="Добави автор и създай таг." title="Автор" url="author" />
        </h2>
        <form>
            <admin:formItem id="authorEnNameInput" label="Псевдоним" 
            				placeholder="Koralsky, doomy, Major Mistake" type="text" />
            <admin:formItem id="authorBgNameInput" label="Име" 
            				placeholder="Ивайло Коралски, Антон Дишков, Йордан Здравков" type="text" />
            <admin:formItem id="authorTagInput" label="Таг" 
            				placeholder="koralasky, doomy, major-mistake" type="text" />
            <h3>Скрити стойности</h3>
            <admin:formItem id="authorSaveIdInput" label="Идентификатор на записа" type="hidden" value="" />
        </form>
        <div role="toolbar">
        	<button class="new" type="button">Нов</button>
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
