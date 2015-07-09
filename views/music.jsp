<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="music">
        <h2>
            <admin:menuItem label="Създай..." title="Музика" url="music" />
        </h2>
        <nav aria-label="Обекти в музика">
            <ul>
                <li>
                    <admin:menuItem label="master-of-puppets, manslaughter" title="Албум" url="album" />
                </li>
                <li>
                    <admin:menuItem label="metallica, body-count, daft-punk" title="Банда" url="band" />
                </li>
                <li>
                    <admin:menuItem label="kirk-hammett, ice-t, pharrell-williams" title="Артист" url="person" />
                </li>
                <li>
                    <admin:menuItem label="sofia-rocks, exit, exit-2014, exit-2015" title="Събитие" url="event" />
                </li>
                <li>
                    <admin:menuItem label="polydor records" title="Компания" url="company" />
                </li>
                <li>
                    <admin:menuItem label="rock, deep-house, dream-pop" title="Жанр" url="genre" />
                </li>
            </ul>
        </nav>
    </section>
</jsp:root>
