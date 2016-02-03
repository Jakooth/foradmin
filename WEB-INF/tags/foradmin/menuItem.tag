<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
            xmlns:fn="http://java.sun.com/jsp/jstl/functions">
    <jsp:directive.tag 	display-name="Forplay admin menu item" 
						body-content="scriptless" language="java" />
    <jsp:directive.attribute name="label" required="true" />
    <jsp:directive.attribute name="clipLabel" required="false" />
    <jsp:directive.attribute name="title" required="false" />
    <jsp:directive.attribute name="url" required="true" />
    <jsp:directive.attribute name="icon" required="false" />
    <a href="#${url}">
        <c:if test="${!empty title}">${title}</c:if>
        <c:if test="${!empty icon}">
            <img class="svg" src="../assets/icons/${fn:split(icon, ',')[0]}/originals/svg/000000/transparent/${fn:split(icon, ',')[1]}.svg" 
            	 alt="${label}" role="presentation" />
        </c:if>
        <span class="${clipLabel}">${label}</span>
    </a>
</jsp:root>
