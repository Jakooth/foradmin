<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="sticker">
        <h2>
            <admin:menuItem label="Добави стикер и създай таг." title="Стикер" url="sticker" />
        </h2>
        <form>
            <div class="Main" role="group">
                <div class="file">
                    <label>
                        <span class="clip">Избери</span>
                        <input id="stickerMainInput" type="file" />
                    </label>
                </div>
            </div>
            <admin:formItem id="stickerEnNameInput" label="Стикер" type="text" 
            				placeholder="Broadsword, Soccer ball, Female elf face" />
            <admin:formItem id="stickerLibInput" label="Библиотека" type="select">
                <option value="">Не е избрана</option>
                <option value="carl-olsen">carl-olsen</option>
                <option value="delapouite">delapouite</option>
                <option value="felbrigg">felbrigg</option>
                <option value="heavenly-dog">heavenly-dog</option>
                <option value="irongamer">irongamer</option>
                <option value="john-colburn">john-colburn</option>
                <option value="john-redman">john-redman</option>
                <option value="lorc">lorc</option>
                <option value="lord-berandas">lord-berandas</option>
                <option value="priorblue">priorblue</option>
                <option value="sbed">sbed</option>
                <option value="various-artists">various-artists</option>
                <option value="viscious-speed">viscious-speed</option>
                <option value="willdabeast">willdabeast</option>
            </admin:formItem>
            <admin:formItem id="stickerTagInput" label="Таг" type="text" 
            				placeholder="broadsword, soccer-ball, female-elf-face" />
            <admin:formItem id="stickerSubtypeSelect" label="Подтип" type="select">
                <option value="">Не е избрана</option>
                <option value="originals">originals</option>
                <option value="dice">dice</option>
                <option value="egypt">egypt</option>
                <option value="gui">gui</option>
                <option value="social">social</option>
                <option value="sports">sports</option>
                <option value="tetris">tetris</option>
                <option value="western">western</option>
                <option value="zodiac">zodiac</option>
                <option value="arrows">arrows</option>
                <option value="hands">hands</option>
                <option value="batteries">batteries</option>
                <option value="public-domain">public-domain</option>
                <option value="abstract">abstract</option>
                <option value="deviations">deviations</option>
            </admin:formItem>
            <h3>Скрити стойности</h3>
            <admin:formItem id="stickerSaveIdInput" label="Идентификатор на записа" type="hidden" value="" />
        </form>
        <div role="toolbar">
        	<button class="new" type="button">Нов</button>
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
