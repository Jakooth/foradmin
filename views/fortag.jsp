<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="fortag">
        <h2>
            <admin:menuItem label="Добави таг." title="Таг" url="fortag" />
        </h2>
        <form>
            <admin:formItem id="fortagObjectSelect" label="Обект" type="select" layout="two-cols" />
            <admin:formItem id="fortagTypeSelect" label="Тип" type="select" layout="two-cols" />
            <admin:formItem id="fortagEnNameInput" label="Име" 
            				placeholder="Crytek, HBO, Walt Disney Animation Studios" type="text" />
            <admin:formItem id="fortagTagInput" label="Таг" 
            				placeholder="crytek, hbo, walt-disney-animation-studios" type="text" />
            <admin:formItem id="fortagBgNameInput" label="Имe на български" 
            				placeholder="Крайтек, ЕйчБиОу, Уолт Дисни Анимейшън Студиос" type="text" />
            <h3>Скрити стойности</h3>
            <admin:formItem id="fortagSaveIdInput" label="Идентификатор на записа" type="hidden" value="" />
        </form>
        <div role="toolbar">
            <button class="new" type="button">Нова</button>
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
