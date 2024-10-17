package danyal.fyp.awd.token;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;

import java.util.*;

/**
 * Sources:
 * <a href = https://bijubnair.blogspot.com/2008/12/adding-header-information-to-existing.html> Tech Flavors via blogspot.com</a>
 * <a href = https://wilddiary.com/adding-custom-headers-java-httpservletrequest/> Drona via wilddiary.com
 */
public class HttpRequestWrapper extends HttpServletRequestWrapper {

    private final Map<String, String> customHeaderMap;

    public HttpRequestWrapper(HttpServletRequest request) {
        super(request);
        customHeaderMap = new HashMap<String, String>();
    }

    public void addHeader(String name, String value) {
        customHeaderMap.put(name, value);
    }

    @Override
    public String getHeader(String name) {

        if (customHeaderMap.containsKey(name)) {
            return customHeaderMap.get(name);
        }
        return super.getHeader(name);
    }

    @Override
    public Enumeration<String> getHeaders(String name) {
        List<String> values = new ArrayList<>();

        if (customHeaderMap.containsKey(name)) {
            values.add(customHeaderMap.get(name));
        }

        Enumeration<String> headers = super.getHeaders(name);
        while (headers.hasMoreElements()) {
            values.add(headers.nextElement());
        }

        return Collections.enumeration(values);
    }

    @Override
    public String getParameter(String name) {
        String paramValue = super.getParameter(name);
        if (paramValue != null) {
            paramValue = customHeaderMap.get(name);
        }
        return paramValue;
    }
}
