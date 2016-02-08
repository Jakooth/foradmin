<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core">
    <jsp:directive.tag 	display-name="Forplay admin img proxy" 
						body-content="scriptless" language="java" />
    <jsp:directive.attribute name="pointer" required="false" />
    <jsp:directive.attribute name="ratio" required="false" />
    <jsp:directive.attribute name="video" required="false" />
    <jsp:directive.attribute name="tracklist" required="false" />
    <jsp:directive.attribute name="addremove" required="false" />
    <jsp:directive.attribute name="alt" required="false" />
    <jsp:directive.attribute name="f3" required="false" />
    <jsp:directive.attribute name="settings" required="false" />
    <div class="img-proxy">
        <div class="file">
            <img alt="" 
                 role="presentation" 
                 src="../assets/helpers/16-9.png" />
            <input aria-label="Избери" type="file" />
            <c:if test="${!empty ratio}">
                <label>
                    <input type="checkbox" value="16-10" />
                    <span>16:10</span>
                </label>
            </c:if>
        </div>
        <c:if test="${!empty addremove}">
            <p contenteditable="true">Натиснете тук, за да редактирате текста.</p>
        </c:if>
        <c:if test="${empty f3 &amp;&amp; empty addremove &amp;&amp; empty settings}">
            <div class="settings">
                <c:if test="${empty alt}">
                    <p data-pointer="${pointer}" contenteditable="true">Натиснете
                        тук, за да редактирате коментара.</p>
                </c:if>
                <c:if test="${!empty video}">
                    <input placeholder="Видео" aria-label="Видео" type="text" />
                </c:if>
                <c:if test="${!empty tracklist}">
                    <select aria-label="Траклист">
                        <option value="">Без траклист</option>
                        <option value="bottom right">долу вдясно</option>
                        <option value="bottom left">долу вляво</option>
                        <option value="top right">горе вдясно</option>
                        <option value="top left">горе вляво</option>
                    </select>
                </c:if>
                
            </div>
        </c:if>
        <c:if test="${!empty f3 &amp;&amp; empty addremove &amp;&amp; empty settings}">
            <div class="tracklist">
                <select aria-label="Позициониране на траклиста">
                    <option value="bottom right">долу вдясно</option>
                    <option value="bottom left">долу вляво</option>
                    <option value="top right">горе вдясно</option>
                    <option value="top left">горе вляво</option>
                </select>
            </div>
        </c:if>
    </div>
    <c:if test="${!empty addremove}">
        <div class="settings">
            <button class="add" type="button">
                <span>Добави картинка</span>
            </button>
            <button class="remove" type="button">
                <span class="clip">Изтрий</span>
            </button>
        </div>
    </c:if>
</jsp:root>
