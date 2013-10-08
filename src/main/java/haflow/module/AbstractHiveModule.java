package haflow.module;

import java.util.Map;

public abstract class AbstractHiveModule extends AbstractModule{
	public abstract String getSQL(Map<String, String> configurations);
}
