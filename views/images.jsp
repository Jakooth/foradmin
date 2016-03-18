<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="images">
        <h2>
            <admin:menuItem label="Прикачи картинкии и избери, кои да влезнат в галерията." 
            				title="Картинки" url="aside" />
        </h2>
        <form>
            <admin:formItem id="imagesTagInput" label="Таг" 
            				placeholder="gta-5, sam-houser, rockstar" 
                            type="text" autocomplete="off" />
            <ul role="listbox">
                <li role="option">
                    <div class="file">
                        <label>
                            <span class="clip">Избери</span>
                            <input type="file" multiple="multiple" />
                        </label>
                    </div>
                </li>
            </ul>
        </form>
        <div role="toolbar">
            <button class="upload" type="button">Качи</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
