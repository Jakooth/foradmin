<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="sitemap">
        <h2>
            <admin:menuItem title="Карта на сайта" url="sitemap"
            				label="Подходяща за Gooogle." />
        </h2>
        <form>
            <admin:formItem id="sitemapCodeOutput" 
            				label="Изходен код" 
                            type="area" readonly="readonly" />
        </form>
        <div role="toolbar">
            <button class="save" type="button">Генерирай</button>
            <button class="publish" type="button">Изпрати</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
