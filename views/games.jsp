<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="games">
        <h2>
            <admin:menuItem label="Създай..." title="Игри" url="games" />
        </h2>
        <nav aria-label="Обекти в игри">
            <ul>
                <li>
                    <admin:menuItem label="gta, gta-5, diablo-3, alien-isolation" title="Игра" url="game" />
                </li>
                <li>
                    <admin:menuItem label="rockstar, take-two, blizzard-north" title="Компания" url="company" />
                </li>
                <li>
                    <admin:menuItem label="win, mac, 360, ps4, vita, android" title="Платформа" url="platform" />
                </li>
                <li>
                    <admin:menuItem label="shigeru-miyamoto, sam-houser" title="Персона" url="person" />
                </li>
                <li>
                    <admin:menuItem label="sonic, master-chief, duke-nukem" title="Герой" url="character" />
                </li>
                <li>
                    <admin:menuItem label="gta, halo" title="Поредица" url="serie" />
                </li>
                <li>
                    <admin:menuItem label="crown-of-the-ivory-king, from-ashes" title="DLC" url="dlc" />
                </li>
                <li>
                    <admin:menuItem label="action, adventure, open-mmo" title="Жанр" url="genre" />
                </li>
            </ul>
        </nav>
    </section>
</jsp:root>
