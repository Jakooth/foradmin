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
            <admin:formItem id="gameEnNameInput" label="Игра" 
            				placeholder="Grand Theft Auto 5" type="text" />
            <admin:formItem id="gameTagInput" label="Таг" 
            				placeholder="gta-5" type="text" />
            <admin:formItem id="gameBgNameInput" label="Име на български" 
            				placeholder="Гранд Тефт Ауто 5" type="text" />
            <admin:formItem id="gameSiteInput" label="Сайт или Уикипедиа" 
            				placeholder="http://www.rockstargames.com/V/" type="text" />
            <admin:formItem id="gameSerieInput" label="Поредица" 
            				placeholder="gta, halo" type="text" 
                            autocomplete="off" url="serie" layout="one-col" />
            <admin:formItem id="gameStickersInput" label="Стикери" 
            				placeholder="Broadsword, Soccer ball, Female elf face" type="text" />
            <admin:formItem id="gameGenreGroup" label="Жанр" type="group">
                <!--AdminManager-->
            </admin:formItem>
            <admin:formItem id="gamePlatformGroup" label="Платформа" type="group">
                <!--AdminManager-->
            </admin:formItem>
            <admin:formItem id="gamePublisherInput" label="Издател" 
            				placeholder="SEGA" type="text" 
                            autocomplete="off" url="company" layout="one-col" />
            <admin:formItem id="gameDeveloperInput" label="Разработчик" 
            				placeholder="Creative Assembly" type="text" 
                            autocomplete="off" url="company" layout="one-col" />
            <admin:formItem id="gameDateInput" label="Премиера за Европа" type="date" layout="two-cols" />
            <admin:formItem id="gameUsDateInput" label="Премиера за САЩ" type="date" layout="two-cols" />
            <admin:formItem id="gameRelatedInput" label="Подобни" 
            				placeholder="saints-row, mafia, Red Dead Redemption, Crackdown" 
                            type="text" autocomplete="off" />
            <h3>Обложки</h3>
            <div class="Add Box">
                <!--AddManager-->
            </div>
            <h3>Скрити стойности</h3>
            <admin:formItem id="gameTypeSelect" label="Тип" type="hidden" value="games" />
            <admin:formItem id="gameSaveIdInput" label="Идентификатор на записа" type="hidden" value="" />
            <admin:formItem id="gameSaveRelatedInput" label="Свързани" type="hidden" value="" />
        </form>
        <div role="toolbar">
            <button class="new" type="button">Нова</button>
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
