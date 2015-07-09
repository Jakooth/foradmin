<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="company">
        <h2>
            <admin:menuItem label="Добави компания и създай таг." title="Компания" url="company" />
        </h2>
        <form>
            <admin:formItem id="companyNameInput" label="Компания" 
            				placeholder="Crytek, HBO, Walt Disney Animation Studios" type="text" />
            <admin:formItem id="companyTagInput" label="Таг" 
            				placeholder="crytek, hbo, walt-disney-animation-studios" type="text" />
            <admin:formItem id="companyTypeSelect" label="Тип" type="select"/>
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
