package danyal.fyp.awd.token;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;

import java.util.*;

public class HttpRequestWrapper extends HttpServletRequestWrapper {

    private final Map<String, String> customHeaderMap;

    public HttpRequestWrapper(HttpServletRequest request) {
        super(request);
        customHeaderMap = new HashMap<String, String>();
    }

    public void addHeader(String name, String value) {
        customHeaderMap.put(name, value);
    }

    public String getHeader(String name) {
        String headerValue = customHeaderMap.get(name);

        if (headerValue != null) {
            return headerValue;
        }
        return super.getHeader(name);
    }

    public Enumeration<String> getHeaders(String name) {
        Set<String> set = new HashSet<String>(customHeaderMap.keySet());

        Enumeration<String> e = super.getHeaders(name);
        while (e.hasMoreElements()) {
            String n = e.nextElement();
            set.add(n);
        }

        return Collections.enumeration(set);
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
