package haflow.module;

import java.util.Map;

public abstract class AbstractHiveModule extends AbstractModule{
	public abstract String getMainClass();
	public abstract String getSQL(Map<String, String> configurations);
	public abstract String getOutPath(Map<String, String> configurations);
}
