<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="game">
        <h2>
            <admin:menuItem label="Добави информация за играта и създай таг." title="Игра" url="game" />
        </h2>
        <form>
            <div class="Main" role="group">
                <div class="file">
                    <label>
                        <span class="clip">Избери</span>
                        <input id="gameMainInput" type="file" />
                    </label>
                </div>
            </div>
            <admin:formItem id="gameEnNameInput" label="Оригинално име на играта" 
            				placeholder="Grand Theft Auto 5" type="text" />
            <admin:formItem id="gameTagInput" label="Таг" 
            				placeholder="gta-5" type="text" />
            <admin:formItem id="gameBgNameInput" label="Име на играта на български" 
            				placeholder="Гранд Тефт Ауто 5" type="text" />
            <admin:formItem id="gameTypeSelect" label="Тип" type="hidden" value="games" />
            <admin:formItem id="gameSerieInput" label="Поредица" 
            				placeholder="gta, halo" type="text" 
                            autocomplete="off" url="serie" layout="one-col" />
            <admin:formItem id="gameStickersInput" label="Стикери" 
            				placeholder="Broadsword, Soccer ball, Female elf face" type="text" />
            <admin:formItem id="gameGenreGroup" label="Жанр" type="group">
                <!--AdminManager.js-->
            </admin:formItem>
            <admin:formItem id="gamePlatformGroup" label="Платформа" type="group">
                <!--AdminManager.js-->
            </admin:formItem>
            <admin:formItem id="gamePublisherInput" label="Разпространител" 
            				placeholder="SEGA" type="text" 
                            autocomplete="off" url="company" layout="one-col" />
            <admin:formItem id="gameDeveloperInput" label="Разработчик" 
            				placeholder="Creative Assembly" type="text" 
                            autocomplete="off" url="company" layout="one-col" />
            <admin:formItem id="gameDateInput" label="Премиера за Европа" type="date" layout="two-cols" />
            <admin:formItem id="gameUsDateInput" label="Премиера за САЩ" type="date" layout="two-cols" />
            <admin:formItem id="gameSimilarInput" label="Подобни" 
            				placeholder="saints-row, mafia, Red Dead Redemption, Crackdown" 
                            type="text" autocomplete="off" />
            <div class="Add Box">
                <button class="add" type="button">Добави обложка</button>
            </div>
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
