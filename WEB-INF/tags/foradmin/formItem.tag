<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core">
    <jsp:directive.tag 	display-name="Forplay admin form item" 
						body-content="scriptless" language="java" />
    <jsp:directive.attribute name="id" required="true" />
    <jsp:directive.attribute name="label" required="true" />
    <jsp:directive.attribute name="type" required="true" />
    <jsp:directive.attribute name="value" required="false" />
    <jsp:directive.attribute name="placeholder" required="false" />
    <jsp:directive.attribute name="readonly" required="false" />
    <jsp:directive.attribute name="autocomplete" required="false" />
    <jsp:directive.attribute name="url" required="false" />
    <jsp:directive.attribute name="layout" required="false" />
    <c:if test="${!empty layout}">
        <![CDATA[<div class="${layout}">]]>
    </c:if>
    <c:choose>
        <c:when test="${type == 'group'}">
            <label>
                <span>${label}:</span>
            </label>
            <div role="group" id="${id}">
                <!--AdminManager.js-->
            </div>
        </c:when>
        <c:when test="${type == 'area'}">
            <label>
                <span>${label}:</span>
                <c:choose>
                    <c:when test="${!empty readonly}">
                        <textarea id="${id}" 
                              readonly="${readonly}" 
                              placeholder="${placeholder}">
                            <jsp:doBody />
                        </textarea>
                    </c:when>
                    <c:otherwise>
                        <textarea id="${id}"
                          placeholder="${placeholder}">
                            <jsp:doBody />
                        </textarea>
                    </c:otherwise>
                </c:choose>
            </label>
        </c:when>
        <c:when test="${type == 'select'}">
            <label>
                <span>${label}:</span>
                <select id="${id}">
                    <jsp:doBody />
                </select>
            </label>
        </c:when>
        <c:when test="${type == 'hidden'}">
            <label>
                <input id="${id}" type="${type}" value="${value}" />
                <span class="hidden">
                    <i>${label}:</i>
                    <b>hidden</b>
                    ${placeholder}</span>
            </label>
        </c:when>
        <c:otherwise>
            <label>
                <span>${label}:</span>
                <input id="${id}" 
                	   placeholder="${placeholder}" 
                	   type="${type == 'search' ? 'text' : type}" 
                       autocomplete="${autocomplete}" />
            </label>
        </c:otherwise>
    </c:choose>
    <c:if test="${!empty url}">
        <a href="#${url}" class="create">
            <img class="svg" alt="Създай ${label}" 
            	 src="../assets/icons/iconmonstr/iconmonstr-plus-2-icon.svg" />
        </a>
    </c:if>
    <c:if test="${type == 'search'}">
        <button type="button" class="search">Търси</button>
    </c:if>
    <c:if test="${!empty layout}">
        <![CDATA[</div>]]>
    </c:if>
</jsp:root>
