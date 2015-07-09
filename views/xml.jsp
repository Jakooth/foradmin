<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="xml">
        <h2>
            <admin:menuItem title="Изходни данни" url="xml"
            				label="Може да копирате изходните данни от тук и да ги пратите на Бат Ваньо." />
        </h2>
        <form>
            <admin:formItem id="xmlCodeOutput" label="Изходен код" type="area" readonly="readonly" />
        </form>
        <div role="toolbar">
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
