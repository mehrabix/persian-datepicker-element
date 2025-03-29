package com.github.mehrabix.persian.datepicker.tag;

import org.springframework.web.servlet.tags.form.AbstractHtmlElementTag;
import org.springframework.web.servlet.tags.form.TagWriter;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class PersianDatePickerTag extends AbstractHtmlElementTag {
    private String path;
    private String placeholder = "انتخاب تاریخ";
    private String format = "YYYY/MM/DD";
    private boolean rtl = true;
    private boolean showHolidays = true;
    private String holidayTypes = "Iran,Religious";
    private String todayButtonText = "امروز";
    private String todayButtonClass;
    private String tomorrowButtonText = "فردا";
    private String tomorrowButtonClass;
    private boolean showMonthSelector = true;
    private boolean showYearSelector = true;
    private boolean showPrevButton = true;
    private boolean showNextButton = true;
    private boolean showTodayButton = true;
    private boolean showTomorrowButton = true;
    private boolean rangeMode = false;

    @Override
    protected int writeTagContent(TagWriter tagWriter) throws JspException {
        tagWriter.startTag("persian-datepicker-element");
        writeDefaultAttributes(tagWriter);

        // Add all attributes
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("placeholder", placeholder);
        attributes.put("format", format);
        attributes.put("rtl", rtl);
        attributes.put("show-holidays", showHolidays);
        attributes.put("holiday-types", holidayTypes);
        attributes.put("today-button-text", todayButtonText);
        attributes.put("today-button-class", todayButtonClass);
        attributes.put("tomorrow-button-text", tomorrowButtonText);
        attributes.put("tomorrow-button-class", tomorrowButtonClass);
        attributes.put("show-month-selector", showMonthSelector);
        attributes.put("show-year-selector", showYearSelector);
        attributes.put("show-prev-button", showPrevButton);
        attributes.put("show-next-button", showNextButton);
        attributes.put("show-today-button", showTodayButton);
        attributes.put("show-tomorrow-button", showTomorrowButton);
        attributes.put("range-mode", rangeMode);

        // Write attributes
        for (Map.Entry<String, Object> entry : attributes.entrySet()) {
            if (entry.getValue() != null) {
                tagWriter.writeAttribute(entry.getKey(), entry.getValue().toString());
            }
        }

        // Add hidden input for form submission
        if (path != null && !path.isEmpty()) {
            tagWriter.startTag("input");
            tagWriter.writeAttribute("type", "hidden");
            tagWriter.writeAttribute("name", path);
            tagWriter.writeAttribute("id", path);
            tagWriter.endTag();
        }

        tagWriter.endTag();

        // Write JavaScript initialization
        JspWriter out = pageContext.getOut();
        try {
            out.write("<script>");
            out.write("document.addEventListener('DOMContentLoaded', function() {");
            out.write("  const picker = document.querySelector('persian-datepicker-element');");
            out.write("  if (picker) {");
            out.write("    picker.addEventListener('change', function(e) {");
            out.write("      const input = document.getElementById('" + path + "');");
            out.write("      if (input) {");
            out.write("        input.value = e.detail.jalali.join('/');");
            out.write("      }");
            out.write("    });");
            out.write("  }");
            out.write("});");
            out.write("</script>");
        } catch (IOException e) {
            throw new JspException("Error writing JavaScript", e);
        }

        return EVAL_BODY_INCLUDE;
    }

    // Getters and setters
    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getPlaceholder() {
        return placeholder;
    }

    public void setPlaceholder(String placeholder) {
        this.placeholder = placeholder;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public boolean isRtl() {
        return rtl;
    }

    public void setRtl(boolean rtl) {
        this.rtl = rtl;
    }

    public boolean isShowHolidays() {
        return showHolidays;
    }

    public void setShowHolidays(boolean showHolidays) {
        this.showHolidays = showHolidays;
    }

    public String getHolidayTypes() {
        return holidayTypes;
    }

    public void setHolidayTypes(String holidayTypes) {
        this.holidayTypes = holidayTypes;
    }

    public String getTodayButtonText() {
        return todayButtonText;
    }

    public void setTodayButtonText(String todayButtonText) {
        this.todayButtonText = todayButtonText;
    }

    public String getTodayButtonClass() {
        return todayButtonClass;
    }

    public void setTodayButtonClass(String todayButtonClass) {
        this.todayButtonClass = todayButtonClass;
    }

    public String getTomorrowButtonText() {
        return tomorrowButtonText;
    }

    public void setTomorrowButtonText(String tomorrowButtonText) {
        this.tomorrowButtonText = tomorrowButtonText;
    }

    public String getTomorrowButtonClass() {
        return tomorrowButtonClass;
    }

    public void setTomorrowButtonClass(String tomorrowButtonClass) {
        this.tomorrowButtonClass = tomorrowButtonClass;
    }

    public boolean isShowMonthSelector() {
        return showMonthSelector;
    }

    public void setShowMonthSelector(boolean showMonthSelector) {
        this.showMonthSelector = showMonthSelector;
    }

    public boolean isShowYearSelector() {
        return showYearSelector;
    }

    public void setShowYearSelector(boolean showYearSelector) {
        this.showYearSelector = showYearSelector;
    }

    public boolean isShowPrevButton() {
        return showPrevButton;
    }

    public void setShowPrevButton(boolean showPrevButton) {
        this.showPrevButton = showPrevButton;
    }

    public boolean isShowNextButton() {
        return showNextButton;
    }

    public void setShowNextButton(boolean showNextButton) {
        this.showNextButton = showNextButton;
    }

    public boolean isShowTodayButton() {
        return showTodayButton;
    }

    public void setShowTodayButton(boolean showTodayButton) {
        this.showTodayButton = showTodayButton;
    }

    public boolean isShowTomorrowButton() {
        return showTomorrowButton;
    }

    public void setShowTomorrowButton(boolean showTomorrowButton) {
        this.showTomorrowButton = showTomorrowButton;
    }

    public boolean isRangeMode() {
        return rangeMode;
    }

    public void setRangeMode(boolean rangeMode) {
        this.rangeMode = rangeMode;
    }
} 